import TableRow from "./TableRow";

const SetupTable = () => {
  return (
    <div className="setup-table">
      <div className="setup-table__title">Set your weekly hours</div>
      <TableRow day="Sun" />
      <TableRow day="Mon" />
      <TableRow day="Tue" />
      <TableRow day="Wed" />
      <TableRow day="Thu" />
      <TableRow day="Fri" />
      <TableRow day="Sat" />
    </div>
  );
};

export default SetupTable;
