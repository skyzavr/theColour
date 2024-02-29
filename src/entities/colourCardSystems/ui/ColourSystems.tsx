import classes from './colourSystems.module.css';

type props = { colourSet: { [key: string]: string } };

export const ColourSystem = ({ colourSet }: props) => {
  return (
    <div className={classes.colourSet}>
      {Object.entries(colourSet).map(([key, val]) => (
        <div className={classes.ColourSetItem} key={key + val}>
          <div>{key}</div>
          <div>{val}</div>
        </div>
      ))}
    </div>
  );
};
