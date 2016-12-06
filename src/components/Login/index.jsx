import React, { PropTypes } from 'react'
import styles from './login.css'

const propTypes = {
    onAuth  : PropTypes.func.isRequired,
    onAuthFb:  PropTypes.func.isRequired
}


function Login ({ onAuth, onAuthFb }) {


    return(
        <div className={styles.root}>
            <p className={styles.text}>
                Necesitamos que inicies sesión con tu cuenta de github
                para carl
            </p>

            <button
                onClick={onAuth}
                className={styles.button}
                >
                <span className='fa fa-github'></span> Login con Github
            </button>

            <br />

            <button
                onClick={onAuthFb}
                className={styles.button}
                >
                <span className='fa fa-facebook'></span> Login con Fb
            </button>
        </div>
    )

}

Login.propTypes = propTypes
export default Login
