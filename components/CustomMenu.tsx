type Props = {
    title: string;
    state: string;
    filters: Array<string>;
    setState: (value: string) => void;
}
export const CustomMenu = ({
    title,
    state,
    filters,
    setState }: Props) => {
    return (
        <div>CustomMenu</div>
    )
}