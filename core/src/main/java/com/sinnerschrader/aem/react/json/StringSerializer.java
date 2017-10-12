package com.sinnerschrader.aem.react.json;

import java.io.IOException;
import java.util.regex.Pattern;

import org.apache.sling.api.resource.ResourceResolver;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.BeanProperty;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.ContextualSerializer;

public class StringSerializer extends JsonSerializer<String> implements ContextualSerializer {

	private static Logger LOGGER = LoggerFactory.getLogger(StringSerializer.class);

	public StringSerializer(String includePattern, String excludePattern) {
		this.includePattern = Pattern.compile(includePattern);
		if (excludePattern != null) {
			this.excludePattern = Pattern.compile(excludePattern);
		}
	}

	private Pattern includePattern;
	private Pattern excludePattern;
	private com.fasterxml.jackson.databind.ser.std.StringSerializer defaultSerializer = new com.fasterxml.jackson.databind.ser.std.StringSerializer();

	@Override
	public void serialize(String value, JsonGenerator gen, SerializerProvider serializers)
			throws IOException, JsonProcessingException {
		if (includePattern.matcher(value).find() && (excludePattern == null || !excludePattern.matcher(value).find())) {
			ResourceResolver resolver = ResourceMapper.getInstance();
			if (resolver == null) {
				gen.writeString(value);
				LOGGER.error("no instance of resourceResolver bound to thread");
			} else {
				gen.writeString(resolver.map(value));
			}
		} else {
			gen.writeString(value);
		}

	}

	@Override
	public JsonSerializer<?> createContextual(SerializerProvider prov, BeanProperty property)
			throws JsonMappingException {
		if (property != null && property.getAnnotation(NoResourceMapping.class) != null) {
			return defaultSerializer;
		}
		return this;

	}

}