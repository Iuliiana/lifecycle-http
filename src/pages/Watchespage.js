import React, {useState} from 'react';
import uuid from 'react-uuid'
import Clock from "../components/clock/Clock";
import Form from "../components/clock/tools/Form";

const Watchespage = () => {
    const [clocks, setClocks] = useState([]);

    const handleFormSubmit = (form) => {
        setClocks((prevState) => [...prevState, {
            id: uuid(),
            name: form.name,
            userTimezone: form.userTimezone,
        }]);
    }

    const getClockIndex = (id) => clocks.findIndex((clock) => clock.id === id);

    const handleDeleteClick = (id) => {
        const index = getClockIndex(id);

        const updatedClocks = [
            ...clocks.slice(0, index),
            ...clocks.slice(index + 1),
        ];
        setClocks(updatedClocks);
    }

    return (
        <div className="wrapper">
            <Form className="form" onFormSubmit={handleFormSubmit}/>
            <div className="clocks">
                {clocks.map((clock) => {
                    return (
                        <Clock
                            key={clock.id}
                            id={clock.id}
                            name={clock.name}
                            userTimezone={clock.userTimezone}
                            onDeleteClick={handleDeleteClick}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export {Watchespage};