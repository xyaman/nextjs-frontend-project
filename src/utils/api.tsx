import { User } from "@/store/types";

// This function fetches users from the JSONPlaceholder API and then fetches images from the Picsum API.
export async function fetchUsersWithImages(): Promise<User[]> {
  const userRes = await fetch("https://jsonplaceholder.typicode.com/users", {
    signal: AbortSignal.timeout(5000),
  });
  const userJSON: User[] = await userRes.json();

  return userJSON.map((user) => {
    user.image_url = `https://picsum.photos/200/300?random=${user.id}`;
    return user;
  });
}
