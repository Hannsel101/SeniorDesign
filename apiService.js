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
 * 
 * Function which adds a new entry into the firebase database and alerts
 * the user when a bad entry has been entered or a the account has been
 * created successfully
 */
export const SignUpUser = (email, password) => {
    return new Promise(function(resolve, reject){
        Auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => {
                resolve('Account Creation Successful!\nPlease Log into your new account.');
            })
            .catch(error => {
                reject(error);
            });
    });
};