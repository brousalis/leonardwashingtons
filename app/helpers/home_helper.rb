module HomeHelper
  def format_content(content)
    markdown = RDiscount.new(content)
    markdown.to_html
  end
end
