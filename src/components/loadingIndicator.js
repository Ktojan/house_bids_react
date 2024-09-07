
export default function LoadingIndicator({ loadingState}) {
    const MyLoader = () => (
        <h2>... {loadingState} ...</h2>
      )
    return <MyLoader/>
}

export const loadingStatus = {
    loaded: 'loaded',
    isLoading: 'Loading some mystics. Wait...',
    hasErrored: 'An error has ocurred while loading'
}

