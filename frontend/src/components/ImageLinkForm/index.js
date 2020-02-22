import React from 'react';

const ImageLinkForm = ({ onInputChange, onButtonClick }) => {
  return (
    <div className="ma4 mt0">
      <p className="f3">{'Detect faces in your picture.'}</p>
      <div className="center">
        <div className="form center pa4 br3 shadow-5 bg-transparent" style={{ width: "700px" }}>
          <input
            placeholder="http://..."
            className="f4 pa2 w-70 center"
            type="text"
            onChange={onInputChange}
          />
          <button
            className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple"
            onClick={onButtonClick}>
            Detect
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageLinkForm;
