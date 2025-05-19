import type { ChatMessageType } from "../model/ChatMessage"

type MessageListProps = {
    messages: ChatMessageType[]
}

export const MessageList = (props: MessageListProps) => {

    const { messages } = props;    
    
    return (
        <div>
          {
            messages.length > 0 ? messages.map((message) => {
                    return (
                    <div key={message.id} className="message">
                        <p>{message.authorName}: {message.content}</p>
                    </div>
                    )
                }) : (<div>{'[no message yet]'}</div>)
          }
        </div>
    )
}