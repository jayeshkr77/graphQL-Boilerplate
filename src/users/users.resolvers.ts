import {Query, Resolver, Mutation, Arg } from "type-graphql"
import {User, UserInput} from "./users.schema";

@Resolver(() => User)
export class UsersResolver {
    //data
    private users: User[] = [
        { id: 1, name: "John Doe", email: "johndoe@gmail.com" },
        { id: 2, name: "Jane Doe", email: "janedoe@gmail.com" },
        { id: 3, name: "Mike Doe", email: "mikedoe@gmail.com" },
    ]

    @Query(() => [User])
    async getUsers(): Promise<User[]>{
        return this.users;
    }

    @Query(() => User)
    async getUser(@Arg("id") id:number): Promise<User | undefined>{
        return this.users.find(u=> u.id == id)
    }

    @Mutation(() => User)
    async createUser(@Arg("input") input: UserInput): Promise<User>{
        const user = {
            id: this.users.length + 1,
            ...input
        }
        this.users.push(user);
        return user;
    }

    @Mutation(() => User)
    async updateUser(@Arg("id") id: number, @Arg("input") input: UserInput): Promise<User>{
        const user = {
            id: id,
            ...input
        }

        const index = this.users.findIndex(u=> u.id === id);
        this.users[index] = user;
        return user;
    }
}