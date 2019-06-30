import React from 'react'
export const MyContext = React.createContext()
// export const MyContext = AccountContext.Consumer
class MyContextProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pointId: '12345vrdg67',
            setPointId: newPointId => this.setState({ pointId: newPointId })
        }
    }

    render() {
        return (
            <MyContext.Provider value={this.state}>
                {this.props.children}
            </MyContext.Provider>
        )
    }
}
export default MyContextProvider
