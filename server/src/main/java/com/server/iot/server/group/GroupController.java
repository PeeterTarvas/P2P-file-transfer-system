package com.server.iot.server.group;

import com.server.iot.server.user.UserDbo;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Slf4j
@RestController
@AllArgsConstructor
@RequestMapping("/group")
public class GroupController {

    private final GroupService groupService;

    @GetMapping
    public List<Group> getAllGroups() {
        return groupService.getAllGroups();
    }

    @GetMapping("/{id}")
    public Optional<Group> getGroupById(@PathVariable Long id) {
        return groupService.getGroupById(id);
    }

    @PostMapping("/groupEntity")
    public Group createGroup(@RequestBody Group group) {
        return groupService.createGroup(group);
    }

    @PostMapping
    public Group createGroup(@RequestBody GroupDto groupDto) {
        return groupService.createGroup(groupDto);
    }

    @PostMapping("/{groupId}/user/{username}")
    public Group addUserToGroup(@PathVariable Long groupId, @PathVariable String username) {
        return groupService.addUserToGroup(groupId, username);
    }

    @DeleteMapping("/{groupId}/user/{username}")
    public Group removeUserFromGroup(@PathVariable Long groupId, @PathVariable String username) {
        return groupService.removeUserFromGroup(groupId, username);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGroup(@PathVariable Long id) {
        groupService.deleteGroup(id);
        return ResponseEntity.noContent().build();  // Return 204 No Content
    }

    @PutMapping("/{id}/name")
    public Group updateGroupName(@PathVariable Long id, @RequestBody String newName) {
        return groupService.updateGroupName(id, newName);
    }

    @PutMapping("/{id}")
    public Group updateGroup(@PathVariable Long id, @RequestBody Group updatedGroup) {
        return groupService.updateGroup(id, updatedGroup);
    }

    @GetMapping("/{groupId}/members")
    public List<UserDbo> getGroupMembers(@PathVariable Long groupId) {
        return groupService.getGroupMembers(groupId);
    }

    @GetMapping("user/{username}")
    public List<Group> getGroupsByUsername(@PathVariable String username) {
        return groupService.getGroupsByUsername(username);
    }
}
