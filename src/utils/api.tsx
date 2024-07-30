import { User } from "@/store/types";

// This function fetches users from the JSONPlaceholder API and then fetches images from the Picsum API.
export async function fetchUsersWithImages(): Promise<User[]> {
  const userRes = await fetch("https://jsonplaceholder.typicode.com/users");
  const userJSON: User[] = await userRes.json();

  const imgsRes = await fetch("https://picsum.photos/v2/list");
  const imgsJSON = await imgsRes.json();

  return userJSON.map((user, i) => {
    user.image_url = imgsJSON[i].download_url;
    return user;
  });
}
