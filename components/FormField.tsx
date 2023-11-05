type Props = {
    type?: string;
    title: string;
    state: string;
    placeholder: string;
    isTextArea?: boolean;
    setState: (value: string) => void;
}
export const FormField = ({ type,
    title,
    state,
    placeholder,
    isTextArea,
    setState }: Props) => {

    return (
        <div className="flexStart flex-col w-full gap.4 ">
            <label className="w-full text-gray-100">
                {title}
            </label>
            {
                isTextArea ? (
                    <textarea
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        placeholder={placeholder}
                        className="form_field-input"
                        required
                    />
                ) : (
                    <input
                        type={type || "text"}
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        placeholder={placeholder}
                        className="form_field-input"
                        required
                    />
                )
            }
        </div>
    )
}
