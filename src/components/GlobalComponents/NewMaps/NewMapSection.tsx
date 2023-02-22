import NewMap from './NewMap';

const NewMapSection = () => {
  return (
    <NewMap
      onLoad={() => {
        console.log('load!');
      }}
    />
  );
};

export default NewMapSection;
