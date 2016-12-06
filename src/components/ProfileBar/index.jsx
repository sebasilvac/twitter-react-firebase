import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import styles from './profile-bar.css'

const propTypes = {
    picture     : PropTypes.string.isRequired,
    displayName : PropTypes.string.isRequired,
    username    : PropTypes.string.isRequired,
    onOpenText  : PropTypes.func.isRequired,
    onLogout    : PropTypes.func.isRequired
}

function ProfileBar ({ picture, displayName, username, onOpenText, onLogout }){

    return(
        <div className={styles.root}>

            <Link to='/profile'>
                <figure>
                    <img className={styles.avatar} src={picture} />
                </figure>
            </Link>


            <span className={styles.username}>Hola <b>{displayName}</b> ( @{username} )!</span>

            <button onClick={onOpenText} className={styles.button}>
                <span className="fa fa-lg fa-edit"></span> Tweet!
            </button>

            <button className={styles.button} onClick={onLogout}>
                <span className='fa fa-sign-out'> Salir</span>
            </button>
        </div>
    )
}

ProfileBar.propTypes = propTypes
export default ProfileBar
