import React from 'react';

interface ResultProps {
  prediction: string;
}

const Result: React.FC<ResultProps> = ({ prediction }) => {
  return (
    <div>
      <h3>Prediction Result</h3>
      <p>{prediction}</p>
    </div>
  );
};

export default Result;
