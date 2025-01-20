import axios from "axios";

export const handleLogin = async () => {
  try {
    const result = await axios.post("http://localhost:5000/admin/login-admin");
  } catch (error) {
    console.log(error);
  }
};

export const handleCreateUser = async ({
  username,
  userrole,
  userPhone,
  userBirth,
  bank,
  bankaccount,
  company,
}: any) => {
  try {
    const result = await axios.post("http://localhost:5000/user/create-user", {
      userName: username,
      userPhone: userPhone,
      userBirth: userBirth,
      userRole: userrole,
      userBank: bank,
      userBankAccount: bankaccount,
      userCompany: company,
    });
  } catch (error) {
    console.log(error);
  }
};

export const handleUpdateUser = async ({
  username,
  userrole,
  userPhone,
  userBirth,
  bank,
  bankaccount,
  company,
}: any) => {
  try {
    const result = await axios.post("http://localhost:5000/user/update-user", {
      userName: username,
      userPhone: userPhone,
      userBirth: userBirth,
      userRole: userrole,
      userBank: bank,
      userBankAccount: bankaccount,
      userCompany: company,
    });
  } catch (error) {
    console.log(error);
  }
};

export const handleDeleteUser = async ({ userPhone }: any) => {
  try {
    const result = await axios.post("http://localhost:5000/user/delete-user", {
      userPhone: userPhone,
    });
  } catch (error) {
    console.log(error);
  }
};

export const handleGetAllUser = async ({ company }: any) => {
  try {
    const result = await axios.post("http://localhost:5000/user/get-alluser", {
      company: company,
    });
  } catch (error) {
    console.log(error);
  }
};

export const handleGetAllUserTimeMonth = async ({ date, company }: any) => {
  try {
    const result = await axios.post(
      "http://localhost:5000/time/get-alluser-time-month",
      {
        date: date,
        company: company,
      }
    );
  } catch (error) {
    console.log(error);
  }
};

export const handleGetAllUserAllTimeMonth = async ({ date, company }: any) => {
  try {
    const result = await axios.post(
      "http://localhost:5000/time/get-alluser-alltime-month",
      {
        date: date,
        company: company,
      }
    );
  } catch (error) {
    console.log(error);
  }
};

export const handleRegisterSchedule = async ({
  userName,
  userCompany,
  date,
  startTime,
  endTime,
}: any) => {
  try {
    const result = await axios.post(
      "http://localhost:5000/time/create-worktime",
      {
        date: date,
      }
    );
  } catch (error) {
    console.error(error);
  }
};
