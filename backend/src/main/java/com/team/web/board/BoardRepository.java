package com.team.web.board;


import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BoardRepository extends JpaRepository<Board,Long> {

    Board findByBoardId(String boardId);
}

