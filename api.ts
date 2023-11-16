interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
}

const getElement = (id: string) =>
  document.getElementById(id) as HTMLDivElement;

const fetchJson = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);
  return response.json() as Promise<T>;
};

const showUserDetails = async (id: number): Promise<void> => {
  try {
    const user = await fetchJson<{ data: User }>(
      `https://reqres.in/api/users/${id}`
    );

    getElement("userslist").innerHTML = `
        <div onclick="showUserDetails(${user.data.id})">
          <h2>${user.data.first_name} ${user.data.last_name}</h2>
          <p>Email: ${user.data.email}</p>
          <img key="${user.data.avatar}" src="${user.data.avatar}">
          <hr />
        </div>`;
  } catch (error) {
    console.error("Error fetching user details:", error);
  }
};

const fetchAndDisplayUsers = async (): Promise<void> => {
  try {
    const data = await fetchJson<{ data: User[] }>(
      "https://reqres.in/api/users/"
    );
    const userList = getElement("userslist");

    data.data.forEach((user: User) => {
      userList.innerHTML += `
          <div onclick="showUserDetails(${user.id})">
            <h2>${user.first_name} ${user.last_name}</h2>
            <p>Email: ${user.email}</p>
            <img key="${user.avatar}" src="${user.avatar}">
            <hr />
          </div>`;
    });
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};

// Fetch and display users when the script runs
fetchAndDisplayUsers();
