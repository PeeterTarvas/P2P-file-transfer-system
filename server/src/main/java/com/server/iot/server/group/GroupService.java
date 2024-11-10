package com.server.iot.server.group;

import com.server.iot.server.user.UserDbo;
import com.server.iot.server.user.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.*;

@AllArgsConstructor
@Service
public class GroupService {

    private final GroupRepository groupRepository;
    private final UserRepository userRepository;

    public List<Group> getAllGroups() {
        return groupRepository.findAll();
    }

    public Optional<Group> getGroupById(Long id) {
        return groupRepository.findById(id);
    }

    public Group createGroup(Group group) {
        return groupRepository.save(group);
    }

    public Group createGroup(GroupDto groupDto) {
        List<UserDbo> managedMembers = new ArrayList<>();
        for (String member : groupDto.getMembers()) {
            Optional<UserDbo> optionalManagedMember = userRepository.getUserDboByUsername(member);
            optionalManagedMember.ifPresent(managedMembers::add);
        }
        Optional<UserDbo> optionalOwner = userRepository.getUserDboByUsername(groupDto.getOwner());
        optionalOwner.ifPresent(managedMembers::add);

        Group newGroup = new Group();
        newGroup.setName(groupDto.getName());
        newGroup.setOwner(groupDto.getOwner());
        newGroup.setMembers(managedMembers);
        return groupRepository.save(newGroup);
    }

    public Group addUserToGroup(Long groupId, Long userId) {
        Group group = groupRepository.findById(groupId)
                .orElseThrow(() -> new IllegalArgumentException("Group not found with ID: " + groupId));
        UserDbo user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with ID: " + userId));

        group.getMembers().add(user);
        return groupRepository.save(group);
    }


    public Group removeUserFromGroup(Long groupId, Long userId) {
        Group group = groupRepository.findById(groupId)
                .orElseThrow(() -> new IllegalArgumentException("Group not found with ID: " + groupId));
        UserDbo user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with ID: " + userId));

        group.getMembers().remove(user);
        return groupRepository.save(group);
    }

    public void deleteGroup(Long groupId) {
        groupRepository.findById(groupId)
                .orElseThrow(() -> new IllegalArgumentException("Group not found with ID: " + groupId));
        groupRepository.deleteById(groupId);
    }


    public Group updateGroupName(Long groupId, String newName) {
        Group group = groupRepository.findById(groupId)
                .orElseThrow(() -> new IllegalArgumentException("Group not found with ID: " + groupId));
        group.setName(newName);
        return groupRepository.save(group);
    }

    public Group updateGroup(Long groupId, Group updatedGroup) {
        Group group = groupRepository.findById(groupId)
                .orElseThrow(() -> new IllegalArgumentException("Group not found with ID: " + groupId));

        // Update the group properties
        group.setName(updatedGroup.getName());

        // Retrieve and update members
        List<UserDbo> managedMembers = new ArrayList<>();
        for (UserDbo member : updatedGroup.getMembers()) {
            UserDbo managedMember = userRepository.findById(member.getUserId())
                    .orElseThrow(() -> new IllegalArgumentException("User not found with ID: " + member.getUserId()));
            managedMembers.add(managedMember);
        }
        group.setMembers(managedMembers);

        return groupRepository.save(group);
    }

    // Method to get all members of a specific group
    public List<UserDbo> getGroupMembers(Long groupId) {
        Group group = groupRepository.findById(groupId)
                .orElseThrow(() -> new IllegalArgumentException("Group not found with ID: " + groupId));

        // Return the list of members in the group
        return group.getMembers();
    }

    public List<Group> getGroupsByUsername(String username) {
        return userRepository.getUserDboByUsername(username)
                .map(UserDbo::getGroups)
                .orElseThrow(() -> new IllegalArgumentException("User not found with isername: " + username));
    }

}
