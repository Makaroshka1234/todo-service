import React from 'react'
import { Member } from '../../types/todo';




interface MembersListProps {
    members: Member[];
}

const MemberList = ({ members }: MembersListProps) => {
    return (

        <ul className='max-w-xs'>
            {members ? members.map(member => (
                <li key={member.userId} className='flex gap-1'>
                    <p> {member.email}</p>
                    <p>{member.role}</p>
                </li>
            )) : 'нема мемберыв'}
        </ul>
    )
}

export default MemberList
