package com.server.iot.server.group;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.server.iot.server.user.UserDbo;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "group", schema = "iot")
public class Group {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "group_id")
    private Long id;

    private String name;

    @ManyToMany
    @JoinTable(
            name = "group_members",
            schema = "iot",
            joinColumns = @JoinColumn(name = "group_id"),
            inverseJoinColumns = @JoinColumn(name = "member_id")
    )

    @JsonBackReference
    private List<UserDbo> members;

    public List<UserDbo> getMembers() {
        return members;
    }

    public void setMembers(List<UserDbo> members) {
        this.members = members;
    }

    public void addMember(UserDbo user) {
        this.members.add(user);
    }
}
