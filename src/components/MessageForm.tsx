type MessageFormProps = {
    onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onMessageSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export const MessageForm = (props: MessageFormProps) => {

    const { onInputChange, onMessageSubmit } = props;

    return (
        <div>
          <form onSubmit={(e) => onMessageSubmit(e)}>
            <input onChange={(e) => onInputChange(e)} placeholder='enter you message here' type="text" name="message" id="input-message"/>
            <button type="submit">send</button>
          </form>
        </div>
    )
}