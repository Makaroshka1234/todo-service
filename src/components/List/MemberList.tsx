import React from "react";
import { Member } from "../../types/todo";

interface MembersListProps {
  members: Member[];
}

const MemberList = ({ members }: MembersListProps) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <div>
        <p className="font-light"> Користувачі списку</p>
      </div>
      <table className="bg-[#212121] border border-gray-300 w-full border-collapse table-auto">
        <thead>
          <tr>
            <th className="px-2 py-1 border border-gray-300 text-left">
              Email
            </th>
            <th className="px-2 py-1 border border-gray-300 text-left">Role</th>
          </tr>
        </thead>
        <tbody>
          {members ? (
            members.map((member) => (
              <tr key={member.userId}>
                <td className="px-2 py-1 border-gray-300 border-t">
                  {member.email}
                </td>
                <td className="px-2 py-1 border-gray-300 border-t">
                  {member.role}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={2} className="px-2 py-1 text-center">
                Немає мемберів
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MemberList;
