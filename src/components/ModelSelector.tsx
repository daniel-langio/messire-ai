import type { OllamaModelInfo } from "../model/OllamaModelInfo"

type ModelSelectorProps = {
    modelList: OllamaModelInfo[];
    onModelChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const ModelSelector = (props: ModelSelectorProps) => {

    const { modelList, onModelChange } = props;
    
    return (
        <div>
          <label htmlFor="choice">
            Model to use :
          </label>
          <select name="model-choice" id="choice"
            onChange={(e) => onModelChange(e)}
            >
              {
                [
                    (<option key={"default"} value={"default"}>{'select a model'}</option>),
                    ...modelList.map((model)=> {
                        return (
                            <option key={model.name} value={model.name}>
                            {model.name}
                            </option>
                        )
                    })
                ]
              }
            </select>
        </div>
    )
}