package org.mycola.sarafan.controller;

import org.mycola.sarafan.exception.NotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/message")
public class MessageController {
	
	private int counter =4;
	private List<Map<String, String>> messages = new ArrayList<Map<String, String>>() {{
		add(new HashMap<String, String>() {{put("id", "1"); put("text", "First Text"); }});
		add(new HashMap<String, String>() {{put("id", "2"); put("text", "Second Text"); }});
		add(new HashMap<String, String>() {{put("id", "3"); put("text", "Third Text"); }});
		add(new HashMap<String, String>() {{put("id", "4"); put("text", "Some Text"); }});
	}};
	
	@GetMapping
	public List<Map<String, String>> list(){
		return messages;
	}
	
	@GetMapping("{id}")
	public Map<String, String> getOne(@PathVariable String id){
		return getMessage(id);
	}
	
	private Map<String, String> getMessage(@PathVariable String id) {
		return messages.stream()
				       .filter(message -> message.get("id").equals(id))
				       .findFirst()
				       .orElseThrow(NotFoundException::new);
	}
	
	@PostMapping
	public Map<String, String> createOne(@RequestBody Map<String, String> message ){
	
		message.put("id", String.valueOf(counter+1));
		messages.add(message);
		return message;
	}
	
	@PutMapping("{id}")
	public Map<String,String> updateOne(@PathVariable ("id")String id, @RequestBody Map<String,String> message){
		Map<String, String> messageFromDb = getMessage(id);
		messageFromDb.putAll(message);
		messageFromDb.put("id",id);
	return messageFromDb;
	}
	
	@DeleteMapping("{id}")
	public void deleteOne(@PathVariable("id")String id){
		Map<String,String>message=getMessage("id");
		messages.remove(message);
	}
	
}
