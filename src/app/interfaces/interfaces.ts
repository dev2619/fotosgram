export interface ResponsePosts {
    ok: boolean;
    page: number;
    totalPosts: number;
    totalPages: number;
    posts: PostElement[];
}

export interface PostElement {
    _id?: string;
    message?: string;
    img?: string[];
    cords?: string;
    user?: User;
    created?: string;
}

export interface User {
    _id?: string;
    name?: string;
    email?: string;
    avatar?: string;
    password?: string;
}

export interface UserPhoto {
    filepath: any;
    webviewPath: string;
    data: string;
    name: string;
}
