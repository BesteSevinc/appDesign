// Anjileen's Code

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons';

// function for filter drop downs
const Accordion = ({ filterData, filter, filterIsActive, isActive, setIsActive }) => {
    return (
        <div className="accordion">
            {filterData.map(({ title, content }) => (
                <div className="accordionItem" key={title}>
                    <div className="accordionTitle" onClick={() => setIsActive(!isActive)}>
                        <div>{title}</div>
                        <div>{isActive ? <FontAwesomeIcon icon={faAngleUp} /> : <FontAwesomeIcon icon={faAngleDown} />}</div>
                    </div>
                    {isActive && (
                        <div className="accordion-content">
                            {content.map((category) => {
                                return (
                                    <p
                                        id={category}
                                        key={category}
                                        onClick={(e) => {
                                            filterIsActive(e.target.id);
                                        }}>
                                        {category}
                                    </p>
                                );
                            })}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Accordion;
