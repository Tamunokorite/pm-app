import { useState } from 'react'
import { Input } from '../ui/input'
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion"
import { Search, Book, MessageCircle, LifeBuoy } from 'lucide-react'

const faqData = [
  {
    question: "How do I create a new project?",
    answer: "To create a new project, go to the Dashboard and click on the 'New Project' button. Fill in the project details and click 'Create'."
  },
  {
    question: "Can I invite team members to my project?",
    answer: "Yes, you can invite team members. Go to the 'Team' page, click on 'Add Team Member', and enter their email address to send an invitation."
  },
  {
    question: "How do I set up task notifications?",
    answer: "To set up task notifications, go to 'Settings', then 'Notification Preferences'. You can choose to receive notifications via email, push notifications, or both."
  },
  {
    question: "Is there a mobile app available?",
    answer: "Yes, we have mobile apps for both iOS and Android. You can download them from the App Store or Google Play Store."
  },
  {
    question: "How can I generate reports?",
    answer: "To generate reports, go to the 'Reports' section in the main menu. You can select the type of report, date range, and other parameters to customize your report."
  }
]

export function Help() {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredFAQs = faqData.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>How can we help you?</CardTitle>
          <CardDescription>Search our help center or browse frequently asked questions.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input
              type="search"
              placeholder="Search for help..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button type="submit">
              <Search className="h-4 w-4" />
              <span className="sr-only">Search</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Book className="mr-2 h-4 w-4" />
              Documentation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>Explore our comprehensive guides and tutorials.</p>
            <Button variant="link" className="mt-2 p-0">View Documentation</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageCircle className="mr-2 h-4 w-4" />
              Community Forum
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>Connect with other users and share your experiences.</p>
            <Button variant="link" className="mt-2 p-0">Visit Forum</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <LifeBuoy className="mr-2 h-4 w-4" />
              Contact Support
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>Get in touch with our support team for personalized help.</p>
            <Button variant="link" className="mt-2 p-0">Contact Us</Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {filteredFAQs.map((faq, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  )
}
