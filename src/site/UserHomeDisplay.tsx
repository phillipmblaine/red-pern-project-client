import React from 'react';

type AcceptedProps = {
    userTripMapper: () => (JSX.Element | undefined)[] | undefined;
    userDestinationMapper: () => (JSX.Element | undefined)[] | undefined;
    tripLength: number;
    destinationLength: number;
}

const UserHomeDisplay: React.FunctionComponent<AcceptedProps> = (props) => {
    return (
        <div className='userHomeDisplayMainDiv'>
            <h2>&#8595; Your Saved Travel Information &#8595;</h2>
            <hr />
            <h2>Trips</h2>
            {
                props.tripLength !== 0
                    ? props.userTripMapper()
                    : <h3>No Trips Yet ...</h3>
            }
            <br/>
            <hr />
            <h2>Destinations</h2>
            {
                props.destinationLength !== 0
                    ? props.userDestinationMapper()
                    : <h3>No Destinations Yet ...</h3>
            }
        </div>
    )
}

export default UserHomeDisplay;