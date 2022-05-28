/// <reference types="node" />
export declare type DataObject = {
    content: string[];
    enabled: boolean;
    axisType: string;
};
export declare type FileData = NodeJS.Dict<DataObject>;
export declare type Project = {
    id: string;
    projectName: string;
    userId: string;
    fileData: FileData;
    createdAt: string;
};
export declare enum HTTPMethods {
    GET = "get",
    POST = "post",
    PATCH = "patch",
    DELETE = "delete"
}
export interface ResponseBase {
    message: string;
}
export interface CreateProjectResponse extends ResponseBase {
    createProject: {
        id: string;
        projectName: string;
        createdAt: string;
        userId: string;
        fileData: FileData;
    };
}
export interface FetchProjectResponse extends ResponseBase {
    getProjects: {
        projects: Project[];
    };
}
export interface APIResponse<R> {
    success: boolean;
    response: R;
}
