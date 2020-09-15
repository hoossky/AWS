package com.team.web.user;

import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public interface UserService {
    Optional<User> findUserByUserId(String userId);

    Optional<User> signUp(User user);

    Optional<User> findUserByNameAndEmail(String name, String email);

    Optional<User> findUserForResetPassword(String userId, String name, String email);

    Optional<User> findUser(Long id);

    User update(User selectUser);

    void delete(User selectUser);

    User findUserById(long userId);
}
