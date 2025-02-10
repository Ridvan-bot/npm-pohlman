export const firstCommand = async (message: string) => {
    try {
        if (typeof message === 'string')
            return message;
    }
    catch (error) {
        console.error(error);
    }
};