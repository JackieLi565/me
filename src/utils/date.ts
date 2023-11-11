export const calculateTimeAgo = (inputDate: Date) => {
  const currentDate = new Date();
  const timeDifference = currentDate.getTime() - inputDate.getTime();

  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  if (daysDifference <= 30) {
    return `${daysDifference} day${daysDifference !== 1 ? "s" : ""} ago`;
  } else {
    const monthsDifference = Math.floor(daysDifference / 30);

    if (monthsDifference < 12) {
      return `${monthsDifference} month${
        monthsDifference !== 1 ? "s" : ""
      } ago`;
    } else {
      const yearsDifference = Math.floor(monthsDifference / 12);
      return `${yearsDifference} year${yearsDifference !== 1 ? "s" : ""} ago`;
    }
  }
};
