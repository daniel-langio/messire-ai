import { useEffect, useState } from 'react'
import { Ollama, type ChatResponse } from 'ollama'
import './App.css'

import { OllamaModelInfo } from './model/OllamaModelInfo';
import { ChatMessage } from './model/ChatMessage';


function App() {
  
  const [isModelListLoaded, setIsModelListLoaded] = useState(false);

  //const {modelName, setModelName} = useState('');
  //const {chatResponse, setChatResponse} = useState('');

  const [modelList, setModelList] = useState<OllamaModelInfo[]>([]);
  const [actualModel, setActualModel] = useState<OllamaModelInfo | null>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [actualUserMessageContent, setActualUserMessageContent] = useState('');

  const ollama = new Ollama({host: 'http://127.0.0.1:11434'});

  
  const loadModelList = () => {
    ollama.list().then((modelResponse) => {
      setModelList([]);
      modelResponse.models.forEach((model) => {
        const modelInfo = new OllamaModelInfo(model.name, model.model, model.size);
        setModelList((prev) => [...prev, modelInfo]);
      })
      setActualModel(modelList[0]);
      setIsModelListLoaded(true);
    }).catch((error) => {
      console.error('Error listing models:', error);
    })
  }

  const getResponse = async (messageContent: string): Promise<string | null> => {
    const message = { role: 'user', content: messageContent };
    
    let response: ChatResponse;

    if (actualModel != null) {
      response = await ollama.chat({ model: actualModel.model, messages: [message], stream: false })
      return response.message.content
    }

    return null
  }
  
  const onModelChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedModelName = event.target.value;
    
    const selectedModel = modelList.find(model => model.name === selectedModelName);
    if (selectedModel) {
      setActualModel(selectedModel);
    }
  }

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setActualUserMessageContent(value);
  }

  const onMessageSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const userMessage = new ChatMessage(Date.now().toString(), 'user', actualUserMessageContent)
    setMessages((prev) => [...prev, userMessage])

    if (actualModel) {
      getResponse(actualUserMessageContent).then((responseContent) => {
        let response: ChatMessage;

        if (responseContent) {
          response = new ChatMessage(Date.now().toString(), actualModel.name, responseContent);
        } else {
          response = new ChatMessage(Date.now().toString(), 'error', 'no model selected')
        }

        setMessages((prev) => [...prev, response])
      })
    }
  }
  
  useEffect(() => {
    if (!isModelListLoaded) {
      loadModelList();
    }
  }, []);
  
  return (
    <>
      <div>
        <h3>Chat with {actualModel ? actualModel?.name : "an AI"}</h3>
        
        <div>
          <label htmlFor="choice">
            Choose a model
          </label>
          <select name="model-choice" id="choice"
            onChange={(e) => onModelChange(e)}
            >
              {
                modelList.map((model)=> {
                  return (
                    <option key={model.name} value={model.name}>
                      {model.name}
                    </option>
                  )
                })
              }
            </select>
        </div>

        <div>
          {messages.map((message) => (
            <div key={message.id}>
              <p>[ {message.authorName} ] : {message.content}</p>
            </div>
          ))}
        </div>

        <div>
          <form onSubmit={(e) => onMessageSubmit(e)}>
            <input onChange={(e) => onInputChange(e)} placeholder='enter you message here' type="text" name="message" id="input-message"/>
            <button type="submit">send</button>
          </form>
        </div>
      </div>

    </>
  )
}

export default App
