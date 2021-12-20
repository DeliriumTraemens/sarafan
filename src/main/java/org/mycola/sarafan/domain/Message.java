package org.mycola.sarafan.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonView;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table
@ToString(of = {"id", "text"})
@EqualsAndHashCode(of = {"id"})
public class Message {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@JsonView(Views.IdShow.class)
	private Long id;
	
	@JsonView(Views.IdName.class)
	private String text;
	
	@Column(updatable=false)
//	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern="yyyy-MM-DD HH:mm:ss")
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
	@JsonView(Views.FullMessage.class)
	private LocalDateTime creationDate;
//	Constructors
	
	public Message() {
	}
	
	public Message(Long id, String text, LocalDateTime creationDate) {
		this.id = id;
		this.text = text;
		this.creationDate = creationDate;
	}
	
	//	Get Set
	
	public Long getId() {
		return id;
	}
	
	public void setId(Long id) {
		id = id;
	}
	
	public String getText() {
		return text;
	}
	
	public void setText(String text) {
		this.text = text;
	}
	
	public LocalDateTime getCreationDate() {
		return creationDate;
	}
	
	public void setCreationDate(LocalDateTime creationDate) {
		this.creationDate = creationDate;
	}
}
