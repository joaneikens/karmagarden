from django.contrib import admin

from .models import Question,Answer

class QuestionAdmin(admin.ModelAdmin):

	list_display=('question_type','post_title','post_text')

class AnswerAdmin(admin.ModelAdmin):

	list_display=('question','answer_text','display_ordering','correct_ordering')

admin.site.register(Question,QuestionAdmin)
admin.site.register(Answer,AnswerAdmin)