import { useInstantSearch } from "react-instantsearch"

const RefreshButton = () => {
    const { refresh } = useInstantSearch();

    return <button onClick={() => refresh()}>
        Refresh Results
    </button>
}

export { RefreshButton }