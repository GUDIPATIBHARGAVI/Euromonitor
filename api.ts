interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
}

const getElement = (id: string): HTMLDivElement | null => {
  return document.getElementById(id) as HTMLDivElement;
};

const fetchJson = async <T>(url: string): Promise<T> => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch data. Status: ${response.status}`);
    }

    return (await response.json()) as T;
  } catch (error) {
    throw new Error(`Error fetching JSON: ${error.message}`);
  }
};

const showUserDetails = async (id: number): Promise<void> => {
  try {
    const user = await fetchJson<{ data: User }>(
      `https://reqres.in/api/users/${id}`
    );

    const userDetails = `
            <div>
                <h2>${user.data.first_name} ${user.data.last_name}</h2>
                <p>Email: ${user.data.email}</p>
                <img key="${user.data.avatar}" src="${user.data.avatar}">
                <hr />
            </div>`;

    const userList = getElement("userslist");
    if (userList) {
      userList.innerHTML = userDetails;
    }
  } catch (error) {
    console.error("Error fetching user details:", error.message);
  }
};

const fetchAndDisplayUsers = async (): Promise<void> => {
  try {
    const data = await fetchJson<{ data: User[] }>(
      "https://reqres.in/api/users/"
    );
    const userList = getElement("userslist");

    if (userList) {
      data.data.forEach((user: User) => {
        const userElement = document.createElement("div");
        userElement.innerHTML = `
                    <h2>${user.first_name} ${user.last_name}</h2>
                    <p>Email: ${user.email}</p>
                    <img key="${user.avatar}" src="${user.avatar}">
                    <hr />`;

        userElement.addEventListener("click", () => showUserDetails(user.id));
        userList.appendChild(userElement);
      });
    }
  } catch (error) {
    console.error("Error fetching users:", error.message);
  }
};

fetchAndDisplayUsers();
