type ForumItemProps = {
    postId: number,
    authorId: number,
    authorNickName: string;
    description: string,
    content: string,
    date?: Date
}

export const forumItemData: ForumItemProps[] = [
    {
        postId: 1,
        authorId: 1,
        authorNickName: "Nick1",
        description: "Description 1",
        content: "Content 1"
    },
    {
        postId: 2,
        authorId: 2,
        authorNickName: "Nick2",
        description: "Description 2",
        content: "Content 2"
    },
    {
        postId: 3,
        authorId: 3,
        authorNickName: "Nick3",
        description: "Description 3",
        content: "Content 3"
    },
    {
        postId: 4,
        authorId: 4,
        authorNickName: "Nick4",
        description: "Description 4",
        content: "Content 4"
    },
    {
        postId: 5,
        authorId: 5,
        authorNickName: "Nick5",
        description: "Description 5",
        content: "Content 5"
    }
];


