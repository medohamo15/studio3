/**
 * This file Copyright (c) 2005-2010 Aptana, Inc. This program is
 * dual-licensed under both the Aptana Public License and the GNU General
 * Public license. You may elect to use one or the other of these licenses.
 * 
 * This program is distributed in the hope that it will be useful, but
 * AS-IS and WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE, TITLE, or
 * NONINFRINGEMENT. Redistribution, except as permitted by whichever of
 * the GPL or APL you select, is prohibited.
 *
 * 1. For the GPL license (GPL), you can redistribute and/or modify this
 * program under the terms of the GNU General Public License,
 * Version 3, as published by the Free Software Foundation.  You should
 * have received a copy of the GNU General Public License, Version 3 along
 * with this program; if not, write to the Free Software Foundation, Inc., 51
 * Franklin St, Fifth Floor, Boston, MA 02110-1301 USA.
 * 
 * Aptana provides a special exception to allow redistribution of this file
 * with certain other free and open source software ("FOSS") code and certain additional terms
 * pursuant to Section 7 of the GPL. You may view the exception and these
 * terms on the web at http://www.aptana.com/legal/gpl/.
 * 
 * 2. For the Aptana Public License (APL), this program and the
 * accompanying materials are made available under the terms of the APL
 * v1.0 which accompanies this distribution, and is available at
 * http://www.aptana.com/legal/apl/.
 * 
 * You may view the GPL, Aptana's exception and additional terms, and the
 * APL in the file titled license.html at the root of the corresponding
 * plugin containing this source file.
 * 
 * Any modifications to this file must keep this entire header intact.
 */
package com.aptana.editor.js.contentassist.index;

import java.io.IOException;
import java.text.MessageFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Pattern;

import com.aptana.core.util.CollectionsUtil;
import com.aptana.core.util.StringUtil;
import com.aptana.editor.js.contentassist.model.FunctionElement;
import com.aptana.editor.js.contentassist.model.PropertyElement;
import com.aptana.editor.js.contentassist.model.TypeElement;
import com.aptana.index.core.Index;
import com.aptana.index.core.IndexReader;
import com.aptana.index.core.QueryResult;
import com.aptana.index.core.SearchPattern;

public class JSIndexReader extends IndexReader
{
	/**
	 * createFunction
	 * 
	 * @param function
	 * @return
	 */
	protected FunctionElement createFunction(QueryResult function)
	{
		return this.populateElement(new FunctionElement(), function, 2);
	}

	/**
	 * createProperty
	 * 
	 * @param property
	 * @return
	 */
	protected PropertyElement createProperty(QueryResult property)
	{
		return this.populateElement(new PropertyElement(), property, 2);
	}

	/*
	 * (non-Javadoc)
	 * @see com.aptana.index.core.IndexReader#getDelimiter()
	 */
	@Override
	protected String getDelimiter()
	{
		return JSIndexConstants.DELIMITER;
	}

	/**
	 * getFunction
	 * 
	 * @param index
	 * @param owningType
	 * @param propertyName
	 * @return
	 * @throws IOException
	 */
	public FunctionElement getFunction(Index index, String owningType, String propertyName) throws IOException
	{
		FunctionElement result = null;

		if (index != null && StringUtil.isEmpty(owningType) == false && StringUtil.isEmpty(propertyName) == false)
		{
			List<QueryResult> functions = index.query( //
				new String[] { JSIndexConstants.FUNCTION }, //
				this.getMemberPattern(owningType, propertyName), //
				SearchPattern.PREFIX_MATCH | SearchPattern.CASE_SENSITIVE //
			);

			if (functions != null && functions.size() > 0)
			{
				result = this.createFunction(functions.get(0));
			}
		}

		return result;
	}

	/**
	 * getFunctions
	 * 
	 * @param index
	 * @param owningTypes
	 * @return
	 * @throws IOException
	 */
	public List<FunctionElement> getFunctions(Index index, List<String> owningTypes) throws IOException
	{
		List<FunctionElement> result = new ArrayList<FunctionElement>();

		if (index != null && CollectionsUtil.isEmpty(owningTypes) == false)
		{
			// read functions
			List<QueryResult> functions = index.query( //
				new String[] { JSIndexConstants.FUNCTION }, //
				this.getMemberPattern(owningTypes), //
				SearchPattern.REGEX_MATCH //
				);

			if (functions != null)
			{
				for (QueryResult function : functions)
				{
					result.add(this.createFunction(function));
				}
			}
		}

		return result;
	}

	/**
	 * getFunctions
	 * 
	 * @param index
	 * @param owningType
	 * @return
	 * @throws IOException
	 */
	public List<FunctionElement> getFunctions(Index index, String owningType) throws IOException
	{
		List<FunctionElement> result = new ArrayList<FunctionElement>();

		if (index != null && StringUtil.isEmpty(owningType) == false)
		{
			// read functions
			List<QueryResult> functions = index.query( //
				new String[] { JSIndexConstants.FUNCTION }, //
				this.getMemberPattern(owningType), //
				SearchPattern.PREFIX_MATCH | SearchPattern.CASE_SENSITIVE //
			);

			if (functions != null)
			{
				for (QueryResult function : functions)
				{
					result.add(this.createFunction(function));
				}
			}
		}

		return result;
	}

	/**
	 * getMemberPattern
	 * 
	 * @param typeNames
	 * @return
	 */
	private String getMemberPattern(List<String> typeNames)
	{
		String typePattern = getUserTypesPattern(typeNames);

		return MessageFormat.format("^{1}{0}", new Object[] { this.getDelimiter(), typePattern }); //$NON-NLS-1$
	}

	/**
	 * getMemberPattern
	 * 
	 * @param typeName
	 * @return
	 */
	private String getMemberPattern(String typeName)
	{
		return MessageFormat.format("{1}{0}", new Object[] { this.getDelimiter(), typeName }); //$NON-NLS-1$
	}

	/**
	 * getMemberPattern
	 * 
	 * @param typeName
	 * @param memberName
	 * @return
	 */
	private String getMemberPattern(String typeName, String memberName)
	{
		return MessageFormat.format("{1}{0}{2}", new Object[] { this.getDelimiter(), typeName, memberName }); //$NON-NLS-1$
	}

	/**
	 * getProperties
	 * 
	 * @param index
	 * @param owningTypes
	 * @return
	 * @throws IOException
	 */
	public List<PropertyElement> getProperties(Index index, List<String> owningTypes) throws IOException
	{
		List<PropertyElement> result = new ArrayList<PropertyElement>();

		if (index != null && CollectionsUtil.isEmpty(owningTypes) == false)
		{
			// read properties
			List<QueryResult> properties = index.query( //
				new String[] { JSIndexConstants.PROPERTY }, //
				this.getMemberPattern(owningTypes), //
				SearchPattern.REGEX_MATCH //
				);

			if (properties != null)
			{
				for (QueryResult property : properties)
				{
					result.add(this.createProperty(property));
				}
			}
		}

		return result;
	}

	/**
	 * getProperties
	 * 
	 * @param index
	 * @param owningType
	 * @return
	 * @throws IOException
	 */
	public List<PropertyElement> getProperties(Index index, String owningType) throws IOException
	{
		List<PropertyElement> result = new ArrayList<PropertyElement>();

		if (index != null && StringUtil.isEmpty(owningType) == false)
		{
			// read properties
			List<QueryResult> properties = index.query( //
				new String[] { JSIndexConstants.PROPERTY }, //
				this.getMemberPattern(owningType), //
				SearchPattern.PREFIX_MATCH | SearchPattern.CASE_SENSITIVE //
			);

			if (properties != null)
			{
				for (QueryResult property : properties)
				{
					result.add(this.createProperty(property));
				}
			}
		}

		return result;
	}

	/**
	 * getProperty
	 * 
	 * @param index
	 * @param owningType
	 * @param propertyName
	 * @return
	 * @throws IOException
	 */
	public PropertyElement getProperty(Index index, String owningType, String propertyName) throws IOException
	{
		PropertyElement result = null;

		if (index != null && StringUtil.isEmpty(owningType) == false && StringUtil.isEmpty(propertyName) == false)
		{
			List<QueryResult> properties = index.query( //
				new String[] { JSIndexConstants.PROPERTY }, //
				this.getMemberPattern(owningType, propertyName), //
				SearchPattern.PREFIX_MATCH | SearchPattern.CASE_SENSITIVE //
			);

			if (properties != null && properties.size() > 0)
			{
				result = this.createProperty(properties.get(0));
			}
		}

		return result;
	}

	/*
	 * (non-Javadoc)
	 * @see com.aptana.index.core.IndexReader#getSubDelimiter()
	 */
	@Override
	protected String getSubDelimiter()
	{
		return JSIndexConstants.SUB_DELIMITER;
	}

	/**
	 * getType
	 * 
	 * @param index
	 * @param typeName
	 * @param includeMembers
	 * @return
	 */
	public TypeElement getType(Index index, String typeName, boolean includeMembers)
	{
		TypeElement result = null;

		if (index != null && StringUtil.isEmpty(typeName) == false)
		{
			try
			{
				String pattern = typeName + this.getDelimiter();
				List<QueryResult> types = index.query(new String[] { JSIndexConstants.TYPE }, pattern, SearchPattern.PREFIX_MATCH);

				if (types != null && types.isEmpty() == false)
				{
					QueryResult type = types.get(0);
					String[] columns = this.getDelimiterPattern().split(type.getWord());
					String retrievedName = columns[0];
					int column = 0;

					// create type
					result = new TypeElement();

					// name
					result.setName(columns[column]);
					column++;

					// super types
					for (String parentType : this.getSubDelimiterPattern().split(columns[column]))
					{
						result.addParentType(parentType);
					}
					column++;

					// description
					if (column < columns.length)
					{
						result.setDescription(columns[column]);
					}
					column++;

					// members
					if (includeMembers)
					{
						// properties
						for (PropertyElement property : this.getProperties(index, retrievedName))
						{
							result.addProperty(property);
						}

						// functions
						for (FunctionElement function : this.getFunctions(index, retrievedName))
						{
							result.addProperty(function);
						}
					}

					// documents
					for (String document : type.getDocuments())
					{
						result.addDocument(document);
					}
				}
			}
			catch (IOException e)
			{
			}
		}

		return result;
	}

	/**
	 * getTypeProperties
	 * 
	 * @param index
	 * @param typeName
	 * @return
	 * @throws IOException
	 */
	public List<PropertyElement> getTypeProperties(Index index, String typeName) throws IOException
	{
		List<PropertyElement> properties = this.getProperties(index, typeName);

		properties.addAll(this.getFunctions(index, typeName));

		return properties;
	}

	/**
	 * Convert a list of types into a regular expression. Note that this method assumes that list is non-empty
	 * 
	 * @param owningTypes
	 * @return
	 */
	protected String getUserTypesPattern(List<String> owningTypes)
	{
		List<String> quotedOwningTypes = new ArrayList<String>(owningTypes.size());

		// escape each owning type
		for (String owningType : owningTypes)
		{
			quotedOwningTypes.add(Pattern.quote(owningType));
		}

		// build pattern for all types
		return "(" + StringUtil.join("|", quotedOwningTypes) + ")"; //$NON-NLS-1$ //$NON-NLS-2$ //$NON-NLS-3$
	}
}
