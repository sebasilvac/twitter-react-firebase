import React, { Component, PropTypes } from 'react'
import uuid         from 'uuid'
import firebase     from 'firebase'
import MessageList  from '../MessageList'
import InputText    from '../InputText'
import ProfileBar   from '../ProfileBar'

const propTypes = {
    user: PropTypes.object.isRequired,
    onLogout: PropTypes.func.isRequired
}

class Main extends Component{

    constructor(props){
        super(props)

        this.state = {
            user: Object.assign({}, this.props.user, { retweets: [] } , { favorites: [] }),
            openText: false,
            userNameToReply: '',
            messages: []
        }

        this.handleOpenText     = this.handleOpenText.bind(this)
        this.handleSendText     = this.handleSendText.bind(this)
        this.handleCloseText    = this.handleCloseText.bind(this)
        this.handleRetweet      = this.handleRetweet.bind(this)
        this.handleFavorite     = this.handleFavorite.bind(this)
        this.handleReplyTweet   = this.handleReplyTweet.bind(this)
    }

    componentWillMount () {

        // listener firebase de BD
        const messagesRef = firebase.database().ref().child('messages')

        messagesRef.on('child_added', snapshot => {
            this.setState({
                messages: this.state.messages.concat( snapshot.val() ),
                openText: false
            })
        })

    }

    handleOpenText (event) {
        event.preventDefault()
        this.setState({ openText: true })
    }

    handleCloseText (event) {
        event.preventDefault()
        this.setState({ openText: false })
    }

    handleSendText (event) {
        event.preventDefault()

        let newMensaje = {
            id: uuid.v4(),
            username : this.props.user.email.split('@')[0],
            displayName: this.props.user.displayName,
            date: Date.now(),
            text: event.target.text.value,
            picture: this.props.user.photoURL,
            favorites: 0,
            retweets: 0
        }

        // añadimos el nuevo mensaje a la BD
        const messageRef = firebase.database().ref().child('messages')
        const messageID  = messageRef.push()
        messageID.set(newMensaje)

    }

    handleRetweet(msgId) {
        // comprobamos que el usuario pueda hacer retweet una sola ves por mensaje
        let alreadyRetweeted = this.state.user.retweets.filter( rt => rt === msgId )

        if (alreadyRetweeted.length === 0) {

            let messages = this.state.messages.map( msg => {
                if(msg.id === msgId) {
                    msg.retweets++;
                }

                return msg
            })

            let user = Object.assign({}, this.state.user)

            user.retweets.push(msgId)

            // si el key con la variable se llman igual nos podemos ahoraar el messages:messages, user:user
            this.setState({
                messages,
                user
            })
        }
    }

    handleFavorite(msgId) {
        // comprobamos que el usuario pueda poner como favorito una sola ves por mensaje
        let alreadyFavorited = this.state.user.favorites.filter( fav => fav === msgId )

        if (alreadyFavorited.length === 0) {

            console.log('sin fav')

            let messages = this.state.messages.map( msg => {
                if(msg.id === msgId) {
                    msg.favorites++;
                }

                return msg
            })

            let user = Object.assign({}, this.state.user)

            user.favorites.push(msgId)

            // si el key con la variable se llman igual nos podemos ahoraar el messages:messages, user:user
            this.setState({
                messages,
                user
            })
        }
    }

    handleReplyTweet(msgId, userNameToReply) {

        this.setState({
            openText: true,
            userNameToReply
        })
    }



    renderOpenText() {
        if (this.state.openText){
            return(
                <InputText
                    onSendText={this.handleSendText}
                    onCloseText={this.handleCloseText}
                    userNameToReply={this.state.userNameToReply}
                />
            )
        }
    }

    render(){
        return (
            <div>
                <ProfileBar
                    picture={this.props.user.photoURL}
                    displayName={this.props.user.displayName}
                    username={this.props.user.email.split('@')[0]}
                    onOpenText={this.handleOpenText}
                    onLogout={this.props.onLogout}
                />

                {this.renderOpenText()}

                <MessageList
                    messages={this.state.messages}
                    onRetweet={this.handleRetweet}
                    onFavorite={this.handleFavorite}
                    onReplyTweet={this.handleReplyTweet}
                />
            </div>
        )
    }
}

Main.propTypes = propTypes
export default Main
