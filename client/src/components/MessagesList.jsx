export const MessagesList = ({ messages, deleteMessage }) => {
    return (
        <ul className="bg-gray-100 p-4 rounded-lg shadow-md max-h-96 overflow-y-auto">
            {
                messages?.map((message) => (
                    <li key={message.id} className="mb-2 p-2 bg-white rounded-lg shadow-sm">
                        <span className="font-bold">{message.author}:</span> {message.text}
                        <button onClick={() => deleteMessage(message.id)} className="ml-4 text-red-500">Delete</button>
                    </li>
                ))}
        </ul>
    )
}