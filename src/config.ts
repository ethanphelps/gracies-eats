export const getConfig = () => {
    switch (process.env.ENV) {
        case "local":
            return Local;
        case "qa":
            return QA;
        case "prod":
            return Prod;
        default:
            throw "Environment not recognized!";
    }
};

const Base = {
    test: "test value",
};

const Local = {
    ...Base,
    // API_URL: "http://localhost:3000",
    API_URL: "https://gnf3cr3vul.execute-api.us-east-1.amazonaws.com/Prod",
};

const QA = {
    ...Base,
    API_URL: "",
};

const Prod = {
    ...Base,
    API_URL: "",
};