import { connect } from 'react-redux'

import GreetingComponent from '../components/GreetingComponent.js'

import {changeName} from '../actions/GreetingAction.js'

const mapStateToProps = (state) => {
    return {
        name: state.name,
        output: state.output
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeName: (name) => {
            dispatch(changeName(name))
        }
    }
}

const GreetingContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(GreetingComponent)

export default GreetingContainer
