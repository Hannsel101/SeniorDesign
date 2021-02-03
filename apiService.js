/**
 * Imported libraries and APIs
 */
import React from 'react';

/**
 * Imported custom classes and variables
 */
import {Auth} from './Setup';

/**
 * 
 * @param {string} email address used to authenticate user
 * @param {string} password used to verify the user 
 * 
 * Function which utilizes a firebase database to authenticate
 * a user based on their email and password entry fields
 */
export const SignInUser = (email, password) => {
    return new Promise(function(resolve, reject){
        Auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => {
                resolve('Signed in sucessfully!');
            })
            .catch(error =>{
                reject(error);
            });
    });
};

/**
 * 
 * @param {string} email address used to create a new account
 * @param {string} password used for future authentication of the user
 */
export const SignUpUser = (email, password) => {
    return new Promise(function(resolve, reject){
        Auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => {
                resolve('Account Creation Successful!');
            })
            .catch(error => {
                reject(error);
            });
    });
};