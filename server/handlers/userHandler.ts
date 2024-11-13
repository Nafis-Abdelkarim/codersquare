import { SignInRequest, SignInResponse, SignUpRequest, SignUpResponse } from "../api";
import { db } from "../datastore";
import { ExpressHandler, User } from "../types";

export const signInHandler : ExpressHandler<SignInRequest, SignInResponse> = async (req, res) => {
    const {login, password} = req.body;

    if(!login || !password){
        res.sendStatus(400);
        return;
    }

    const existing = (await db.getUserByEmail(login) || await db.getUserByUsername(login));

    if(!existing || existing.password != password){
        res.sendStatus(403);
        return;
    }

    res.status(200).send({
        email: existing.email,
        firstName: existing.firstName,
        lastName: existing.lastName,
        userName: existing.userName,
        Id: existing.id
    });

}

export const signUpHandler : ExpressHandler<SignUpRequest, SignUpResponse> = async (req, res) => {
    const { email, firstName, lastName, password, userName } = req.body;

    if (!email || !firstName || !lastName || !password || !userName) {
        res.status(400).send("All fields are required");
        return;
    }

    const existing = await db.getUserByEmail(email) || await db.getUserByUsername(userName);
    if (existing) {
        res.status(403).send("User already exists");
        return;
    }

    const user: User = {
        id: crypto.randomUUID(),
        email,
        firstName,
        lastName,
        userName,
        password,
    };

    await db.createUser(user);
    res.sendStatus(200);
};