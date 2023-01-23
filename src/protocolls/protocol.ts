export type UserBirth = {
    id: number;
    name: string;
    cpf: string;
    birthMonth: string;
    age:number;
}

export type UserData = Omit<UserBirth, "id">