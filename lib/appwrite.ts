import { Account, Client, Databases } from 'react-native-appwrite';

export const appwriteConfig = {
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT || 'https://fra.cloud.appwrite.io/v1',
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID || '697f78ce001c41982671',
    platform: "com.food.foodordering",
    databaseID: "697f7a8600353485c756",
    usersCollectionID: "user",
}

const client = new Client()
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId)
    .setPlatform(appwriteConfig.platform);

export const account = new Account(client);
export const databases = new Databases(client);

export { client };
