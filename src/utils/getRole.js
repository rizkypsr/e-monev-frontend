const getRole = (roleId) => {
  switch (roleId) {
    case 1:
      return "Super Admin";
    case 2:
      return "User OPD";
  }
};

export default getRole;
